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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      article_ratings: {
        Row: {
          created_at: string
          id: string
          post_slug: string
          rating: number
          user_ip: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_slug: string
          rating: number
          user_ip?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_slug?: string
          rating?: number
          user_ip?: string
        }
        Relationships: []
      }
      ats_reports: {
        Row: {
          created_at: string
          has_job_description: boolean
          id: string
          report: Json
          share_id: string
        }
        Insert: {
          created_at?: string
          has_job_description?: boolean
          id?: string
          report: Json
          share_id: string
        }
        Update: {
          created_at?: string
          has_job_description?: boolean
          id?: string
          report?: Json
          share_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string
          id: string
          is_published: boolean
          meta_description: string
          meta_title: string
          published_at: string | null
          reading_time: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          is_published?: boolean
          meta_description?: string
          meta_title?: string
          published_at?: string | null
          reading_time?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          is_published?: boolean
          meta_description?: string
          meta_title?: string
          published_at?: string | null
          reading_time?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          marketing_consent: boolean
          report_share_id: string | null
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          marketing_consent?: boolean
          report_share_id?: string | null
          source?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          marketing_consent?: boolean
          report_share_id?: string | null
          source?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
        }
        Relationships: []
      }
      generations: {
        Row: {
          created_at: string
          id: string
          input: Json
          output: string
          tool_slug: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          input?: Json
          output: string
          tool_slug: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          input?: Json
          output?: string
          tool_slug?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          source: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          source?: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          source?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      payment_events: {
        Row: {
          created_at: string
          environment: string
          event_id: string
          event_type: string
          id: string
          occurred_at: string | null
          payload: Json
        }
        Insert: {
          created_at?: string
          environment: string
          event_id: string
          event_type: string
          id?: string
          occurred_at?: string | null
          payload?: Json
        }
        Update: {
          created_at?: string
          environment?: string
          event_id?: string
          event_type?: string
          id?: string
          occurred_at?: string | null
          payload?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          paddle_customer_id: string | null
          paddle_subscription_id: string | null
          plan: string
          price_id: string | null
          product_id: string | null
          provider_customer_id: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          paddle_customer_id?: string | null
          paddle_subscription_id?: string | null
          plan?: string
          price_id?: string | null
          product_id?: string | null
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          paddle_customer_id?: string | null
          paddle_subscription_id?: string | null
          plan?: string
          price_id?: string | null
          product_id?: string | null
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          article_content: string
          article_title: string
          category: string
          created_at: string
          faqs: Json
          form_fields: Json
          icon: string
          id: string
          is_published: boolean
          meta_description: string
          meta_title: string
          name: string
          output_label: string
          short_description: string
          slug: string
          sort_order: number
          system_prompt: string
          updated_at: string
        }
        Insert: {
          article_content?: string
          article_title?: string
          category?: string
          created_at?: string
          faqs?: Json
          form_fields?: Json
          icon?: string
          id?: string
          is_published?: boolean
          meta_description?: string
          meta_title?: string
          name: string
          output_label?: string
          short_description?: string
          slug: string
          sort_order?: number
          system_prompt?: string
          updated_at?: string
        }
        Update: {
          article_content?: string
          article_title?: string
          category?: string
          created_at?: string
          faqs?: Json
          form_fields?: Json
          icon?: string
          id?: string
          is_published?: boolean
          meta_description?: string
          meta_title?: string
          name?: string
          output_label?: string
          short_description?: string
          slug?: string
          sort_order?: number
          system_prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          created_at: string
          id: string
          ip_hash: string | null
          tool_slug: string
          user_id: string | null
          visitor_key: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_hash?: string | null
          tool_slug: string
          user_id?: string | null
          visitor_key?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_hash?: string | null
          tool_slug?: string
          user_id?: string | null
          visitor_key?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_active_subscription: {
        Args: { check_env?: string; user_uuid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
