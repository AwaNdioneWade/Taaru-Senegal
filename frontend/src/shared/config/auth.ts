interface TestUser {
  email: string;
  password: string;
  role: string;
  fullName: string;
}

export const testUsers: TestUser[] = [
  {
    email: 'admin@taaru.com',
    password: 'admin123',
    role: 'Admin',
    fullName: 'Admin Taaru'
  },
  {
    email: 'tailleur@taaru.com',
    password: 'tailleur123',
    role: 'Tailleur',
    fullName: 'Tailleur Taaru'
  },
  {
    email: 'client@taaru.com',
    password: 'client123',
    role: 'Client',
    fullName: 'Client Taaru'
  }
]; 