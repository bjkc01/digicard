export type WorkspaceNotifications = {
  cardOpens: boolean;
  newSaves: boolean;
  qrScans: boolean;
  weeklyDigest: boolean;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          cards_updated_at: string | null;
          company: string | null;
          created_at: string;
          default_template_id: string;
          email: string;
          id: string;
          linkedin: string | null;
          name: string;
          notifications: WorkspaceNotifications;
          notifications_updated_at: string | null;
          owner_email: string;
          phone: string | null;
          profile_updated_at: string | null;
          qr_preference: "auto" | "linkedin" | "website";
          template_updated_at: string | null;
          title: string | null;
          updated_at: string;
          user_id: string;
          website: string | null;
        };
        Insert: {
          cards_updated_at?: string | null;
          company?: string | null;
          created_at?: string;
          default_template_id?: string;
          email: string;
          id?: string;
          linkedin?: string | null;
          name: string;
          notifications?: WorkspaceNotifications;
          notifications_updated_at?: string | null;
          owner_email: string;
          phone?: string | null;
          profile_updated_at?: string | null;
          qr_preference?: "auto" | "linkedin" | "website";
          template_updated_at?: string | null;
          title?: string | null;
          updated_at?: string;
          user_id: string;
          website?: string | null;
        };
        Update: {
          cards_updated_at?: string | null;
          company?: string | null;
          created_at?: string;
          default_template_id?: string;
          email?: string;
          id?: string;
          linkedin?: string | null;
          name?: string;
          notifications?: WorkspaceNotifications;
          notifications_updated_at?: string | null;
          owner_email?: string;
          phone?: string | null;
          profile_updated_at?: string | null;
          qr_preference?: "auto" | "linkedin" | "website";
          template_updated_at?: string | null;
          title?: string | null;
          updated_at?: string;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      workspace_cards: {
        Row: {
          company: string | null;
          created_at: string;
          email: string;
          id: string;
          label: string;
          linkedin: string | null;
          name: string;
          phone: string | null;
          profile_id: string;
          qr_preference: "auto" | "linkedin" | "website";
          template_id: string;
          title: string;
          updated_at: string;
          user_id: string;
          website: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          email: string;
          id: string;
          label?: string;
          linkedin?: string | null;
          name: string;
          phone?: string | null;
          profile_id: string;
          qr_preference?: "auto" | "linkedin" | "website";
          template_id?: string;
          title: string;
          updated_at?: string;
          user_id: string;
          website?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          label?: string;
          linkedin?: string | null;
          name?: string;
          phone?: string | null;
          profile_id?: string;
          qr_preference?: "auto" | "linkedin" | "website";
          template_id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type SupabaseProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type SupabaseProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type SupabaseProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type SupabaseWorkspaceCard = Database["public"]["Tables"]["workspace_cards"]["Row"];
export type SupabaseWorkspaceCardInsert = Database["public"]["Tables"]["workspace_cards"]["Insert"];
export type SupabaseWorkspaceCardUpdate = Database["public"]["Tables"]["workspace_cards"]["Update"];
