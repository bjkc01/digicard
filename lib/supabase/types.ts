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
          company: string | null;
          created_at: string;
          default_template_id: string;
          email: string;
          id: string;
          linkedin: string | null;
          name: string;
          notifications: WorkspaceNotifications;
          owner_email: string;
          phone: string | null;
          qr_preference: "auto" | "linkedin" | "website";
          title: string | null;
          updated_at: string;
          user_id: string;
          website: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          default_template_id?: string;
          email: string;
          id?: string;
          linkedin?: string | null;
          name: string;
          notifications?: WorkspaceNotifications;
          owner_email: string;
          phone?: string | null;
          qr_preference?: "auto" | "linkedin" | "website";
          title?: string | null;
          updated_at?: string;
          user_id: string;
          website?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          default_template_id?: string;
          email?: string;
          id?: string;
          linkedin?: string | null;
          name?: string;
          notifications?: WorkspaceNotifications;
          owner_email?: string;
          phone?: string | null;
          qr_preference?: "auto" | "linkedin" | "website";
          title?: string | null;
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
