// Services/supabase/categoryService.js
import { supabase } from './config';

// ==================================
// CATEGORY OPERATIONS
// ==================================

export const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    
    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

// 🔥 UPDATED: Handle bilingual category creation
export const createCategory = async (categoryData) => {
  try {
    // Ensure bilingual format for name and description
    let name, description;
    
    if (typeof categoryData.name === 'string') {
      // Convert string to bilingual object
      const categoryName = categoryData.name;
      name = {
        en: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
        ms: categoryName.charAt(0).toUpperCase() + categoryName.slice(1) // For now, keep same - admin can update later
      };
    } else {
      name = categoryData.name;
    }
    
    if (typeof categoryData.description === 'string') {
      // Convert string to bilingual object
      description = {
        en: categoryData.description,
        ms: categoryData.description // For now, keep same - admin can update later
      };
    } else if (categoryData.description) {
      description = categoryData.description;
    } else {
      // Create default description
      const categoryName = typeof categoryData.name === 'string' ? categoryData.name : categoryData.name.en;
      description = {
        en: `Questions about ${categoryName}`,
        ms: `Soalan tentang ${categoryName}`
      };
    }

    const { data, error } = await supabase
      .from('quiz_categories')
      .insert({
        name: name,
        slug: categoryData.slug || (typeof categoryData.name === 'string' 
          ? categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          : categoryData.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
        description: description,
        image_url: categoryData.image_url,
        is_active: categoryData.is_active ?? true,
        display_order: categoryData.display_order ?? 0,
        created_by: categoryData.created_by
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating category:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
};

// 🔥 FIXED: Proper JSONB query for finding category by name
export const findCategoryByName = async (categoryName) => {
  try {
    // Use proper JSONB query with text casting
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('*')
      .or(`name->>en.ilike.%${categoryName}%,name->>ms.ilike.%${categoryName}%`)
      .eq('is_active', true)
      .limit(1);
    
    if (error) {
      console.error('Error finding category by name:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error finding category by name:', error);
    return null;
  }
};