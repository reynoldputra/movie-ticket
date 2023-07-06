export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          age: number
          balance: number
          created_at: string | null
          id: string
          name: string
          username: string
        }
        Insert: {
          age: number
          balance?: number
          created_at?: string | null
          id: string
          name: string
          username: string
        }
        Update: {
          age?: number
          balance?: number
          created_at?: string | null
          id?: string
          name?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

