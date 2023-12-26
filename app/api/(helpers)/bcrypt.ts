import bcrypt from 'bcrypt';






export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };
  
  // Function to compare a password with a hashed password
 