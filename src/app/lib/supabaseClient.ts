import { supabase } from "./supabase";

export async function fetchData(tableName: string) {
  if (!tableName) throw new Error("Table name is required");

  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}