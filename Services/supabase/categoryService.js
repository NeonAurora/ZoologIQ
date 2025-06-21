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

export const createCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .insert({
        name: categoryData.name,
        slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: categoryData.description,
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