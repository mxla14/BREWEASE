export const supabase = {
  from: (tableName: string) => ({
    select: (columns: string) => ({
      eq: (columnName: string, value: any) => ({
        single: async () => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning null data.")
          return { data: null, error: null }
        },
        order: (columnName: string, options: { ascending: boolean }) => ({
          eq: (columnName: string, value: any) => ({
            select: async () => {
              console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
              return { data: [], error: null }
            },
          }),
        }),
        select: async () => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
          return { data: [], error: null }
        },
      }),
      order: (columnName: string, options: { ascending: boolean }) => ({
        eq: (columnName: string, value: any) => ({
          select: async () => {
            console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
            return { data: [], error: null }
          },
        }),
      }),
      select: async () => {
        console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
        return { data: [], error: null }
      },
    }),
    insert: (records: any[]) => ({
      select: () => ({
        then: (callback: (result: { data: any[]; error: any }) => void) => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
          callback({ data: [], error: null })
        },
        select: async () => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
          return { data: [], error: null }
        },
      }),
    }),
    upsert: (records: any[]) => ({
      select: () => ({
        then: (callback: (result: { data: any[]; error: any }) => void) => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
          callback({ data: [], error: null })
        },
        select: async () => {
          console.warn("Supabase client is not fully implemented in this prototype. Returning empty array.")
          return { data: [], error: null }
        },
      }),
    }),
  }),
}
