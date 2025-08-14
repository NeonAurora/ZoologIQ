// utils/csvUtils.js

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert
 * @param {string} tableName - Name of the table for reference
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, tableName = 'data') => {
  if (!Array.isArray(data) || data.length === 0) {
    return `Table: ${tableName}\nNo data available\n\n`;
  }

  // Get all unique keys from all objects
  const allKeys = [...new Set(data.flatMap(row => Object.keys(row)))];
  
  // Create header row
  const headers = allKeys.join(',');
  
  // Create data rows
  const rows = data.map(row => {
    return allKeys.map(key => {
      let value = row[key];
      
      // Handle null/undefined values
      if (value === null || value === undefined) {
        return '';
      }
      
      // Handle objects and arrays by stringifying them
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      
      // Convert to string and escape commas and quotes
      value = String(value);
      
      // If value contains comma, newline, or quote, wrap in quotes and escape quotes
      if (value.includes(',') || value.includes('\n') || value.includes('"')) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      
      return value;
    }).join(',');
  });
  
  // Combine header and rows
  const csvContent = [
    `# Table: ${tableName}`,
    `# Records: ${data.length}`,
    `# Exported: ${new Date().toISOString()}`,
    '',
    headers,
    ...rows,
    '',
    ''
  ].join('\n');
  
  return csvContent;
};

/**
 * Convert multiple tables export data to CSV format
 * @param {Object} exportData - Export data from supabase service
 * @returns {Object} Object containing CSV data for each table
 */
export const convertExportDataToCSV = (exportData) => {
  const csvFiles = {};
  
  if (!exportData || !exportData.tables) {
    return csvFiles;
  }
  
  // Convert each table to CSV
  Object.entries(exportData.tables).forEach(([tableName, tableData]) => {
    const { data, metadata } = tableData;
    const csvContent = convertToCSV(data, tableName);
    
    csvFiles[tableName] = {
      content: csvContent,
      filename: `${tableName}_${new Date().toISOString().split('T')[0]}.csv`,
      metadata: metadata
    };
  });
  
  return csvFiles;
};