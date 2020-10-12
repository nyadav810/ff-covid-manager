interface User {
  avatar?: string;
  display_name?: string;
  is_bot?: boolean;
  is_owner?: boolean;
  league_id?: string;
  metadata?: any;
  settings?: any;
  user_id?: string;
  username?: string;
}

export default User;
