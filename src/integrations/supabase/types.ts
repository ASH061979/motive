export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      amc_fund_performance: {
        Row: {
          amc_name: string
          benchmark: string | null
          category: string | null
          created_at: string
          daily_aum: number | null
          five_year_return: number | null
          id: string
          latest_nav: number | null
          nav_date: string | null
          one_year_return: number | null
          previous_nav: number | null
          risk_level: string | null
          scheme_code: string | null
          scheme_name: string
          sub_category: string | null
          ten_year_return: number | null
          three_year_return: number | null
          updated_at: string
        }
        Insert: {
          amc_name: string
          benchmark?: string | null
          category?: string | null
          created_at?: string
          daily_aum?: number | null
          five_year_return?: number | null
          id?: string
          latest_nav?: number | null
          nav_date?: string | null
          one_year_return?: number | null
          previous_nav?: number | null
          risk_level?: string | null
          scheme_code?: string | null
          scheme_name: string
          sub_category?: string | null
          ten_year_return?: number | null
          three_year_return?: number | null
          updated_at?: string
        }
        Update: {
          amc_name?: string
          benchmark?: string | null
          category?: string | null
          created_at?: string
          daily_aum?: number | null
          five_year_return?: number | null
          id?: string
          latest_nav?: number | null
          nav_date?: string | null
          one_year_return?: number | null
          previous_nav?: number | null
          risk_level?: string | null
          scheme_code?: string | null
          scheme_name?: string
          sub_category?: string | null
          ten_year_return?: number | null
          three_year_return?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      email_account_tracking: {
        Row: {
          account_count: number
          created_at: string
          id: string
          normalized_email: string
          updated_at: string
        }
        Insert: {
          account_count?: number
          created_at?: string
          id?: string
          normalized_email: string
          updated_at?: string
        }
        Update: {
          account_count?: number
          created_at?: string
          id?: string
          normalized_email?: string
          updated_at?: string
        }
        Relationships: []
      }
      pan_email_tracking: {
        Row: {
          created_at: string
          email: string
          id: string
          pan_number: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          pan_number: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          pan_number?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_assets: {
        Row: {
          asset_name: string
          asset_type: Database["public"]["Enums"]["asset_type"]
          category: string | null
          created_at: string
          current_value: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          asset_name: string
          asset_type: Database["public"]["Enums"]["asset_type"]
          category?: string | null
          created_at?: string
          current_value?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          asset_name?: string
          asset_type?: Database["public"]["Enums"]["asset_type"]
          category?: string | null
          created_at?: string
          current_value?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_transactions: {
        Row: {
          amount: number
          asset_id: string | null
          created_at: string
          id: string
          scheme_name: string
          transaction_date: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          asset_id?: string | null
          created_at?: string
          id?: string
          scheme_name: string
          transaction_date: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          asset_id?: string | null
          created_at?: string
          id?: string
          scheme_name?: string
          transaction_date?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "user_assets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      normalize_email: { Args: { email: string }; Returns: string }
      register_pan_for_email: {
        Args: { p_email: string; p_pan: string }
        Returns: boolean
      }
    }
    Enums: {
      asset_type:
        | "mutual_funds"
        | "shares_bonds"
        | "fixed_deposits"
        | "other_assets"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_type: [
        "mutual_funds",
        "shares_bonds",
        "fixed_deposits",
        "other_assets",
      ],
    },
  },
} as const
