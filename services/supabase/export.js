// services/supabase/exportService.js
import { supabase } from './config';

/**
 * Get list of available tables for export
 * @param {string} userId - Auth0 user ID  
 * @returns {Promise<object>} List of available tables with metadata
 */
export const getAvailableTables = async (userId) => {
  try {
    console.log(`🔍 Getting available tables for user: ${userId}`);
    
    if (!userId) {
      return {
        success: false,
        message: 'User ID is required'
      };
    }
    
    const { data: functionResult, error: functionError } = await supabase
      .rpc('get_available_tables_for_export', { 
        user_id: userId
      });
    
    if (functionError) {
      console.error('❌ RPC Error getting available tables:', functionError);
      return {
        success: false,
        message: `Database error: ${functionError.message}`
      };
    }
    
    if (!functionResult || !functionResult.success) {
      console.error('❌ Function returned error:', functionResult);
      return {
        success: false,
        message: functionResult?.message || 'Unknown error from database function'
      };
    }
    
    console.log(`✅ Found ${functionResult.data?.length || 0} available tables`);
    return {
      success: true,
      data: functionResult.data || []
    };
    
  } catch (error) {
    console.error('💥 Error in getAvailableTables:', error);
    return {
      success: false,
      message: `Unexpected error: ${error.message}`
    };
  }
};

/**
 * Export data from a single table
 * @param {string} userId - Auth0 user ID
 * @param {string} tableName - Name of the table to export
 * @returns {Promise<object>} Export result with table data
 */
export const exportSingleTable = async (userId, tableName) => {
  try {
    console.log(`🚀 Exporting table: ${tableName} for user: ${userId}`);
    
    if (!userId) {
      return {
        success: false,
        message: 'User ID is required'
      };
    }
    
    const { data: exportResult, error } = await supabase.rpc('export_table_data', {
      user_id: userId,
      table_name: tableName
    });
    
    if (error) {
      console.error(`❌ RPC Error exporting table ${tableName}:`, error);
      return {
        success: false,
        message: `Failed to export table ${tableName}: ${error.message}`
      };
    }
    
    if (!exportResult || !exportResult.success) {
      console.error(`❌ Export failed for table ${tableName}:`, exportResult);
      return {
        success: false,
        message: exportResult?.message || `Unknown error exporting ${tableName}`
      };
    }
    
    console.log(`✅ Successfully exported table ${tableName} with ${exportResult.record_count} records`);
    return {
      success: true,
      data: exportResult
    };
    
  } catch (error) {
    console.error(`💥 Error in exportSingleTable for ${tableName}:`, error);
    return {
      success: false,
      message: `Unexpected error exporting table ${tableName}: ${error.message}`
    };
  }
};

/**
 * Export data from multiple tables
 * @param {string} userId - Auth0 user ID  
 * @param {string[]} tableNames - Array of table names to export
 * @returns {Promise<object>} Export result with all table data
 */
export const exportMultipleTables = async (userId, tableNames) => {
  try {
    console.log(`🚀 Starting export of ${tableNames.length} tables for user: ${userId}`);
    console.log(`📋 Tables to export:`, tableNames);
    
    if (!userId) {
      return {
        success: false,
        message: 'User ID is required'
      };
    }
    
    if (!Array.isArray(tableNames) || tableNames.length === 0) {
      return {
        success: false,
        message: 'No tables specified for export'
      };
    }
    
    const exportResults = [];
    const errors = [];
    
    // Export each table sequentially
    for (const tableName of tableNames) {
      const result = await exportSingleTable(userId, tableName);
      
      if (result.success) {
        exportResults.push(result.data);
        console.log(`✅ Exported ${tableName}: ${result.data.record_count} records`);
      } else {
        errors.push({
          table: tableName,
          error: result.message
        });
        console.error(`❌ Failed to export ${tableName}:`, result.message);
      }
      
      // Small delay between exports
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Prepare final export package
    const exportPackage = {
      export_metadata: {
        exported_by: userId,
        exported_at: new Date().toISOString(),
        total_tables_requested: tableNames.length,
        successful_exports: exportResults.length,
        failed_exports: errors.length,
        total_records: exportResults.reduce((sum, table) => sum + (table.record_count || 0), 0)
      },
      tables: exportResults.reduce((acc, tableData) => {
        acc[tableData.table_name] = {
          metadata: {
            table_name: tableData.table_name,
            record_count: tableData.record_count,
            exported_at: tableData.exported_at
          },
          data: tableData.data
        };
        return acc;
      }, {}),
      errors: errors.length > 0 ? errors : undefined
    };
    
    console.log(`🎉 Export completed! ${exportResults.length}/${tableNames.length} tables exported`);
    
    return {
      success: exportResults.length > 0,
      data: exportPackage,
      message: errors.length > 0 
        ? `Export completed with ${errors.length} errors. Check the errors array for details.`
        : `Successfully exported ${exportResults.length} tables`
    };
    
  } catch (error) {
    console.error('💥 Error in exportMultipleTables:', error);
    return {
      success: false,
      message: `Unexpected error during multi-table export: ${error.message}`
    };
  }
};