import bcrypt from 'bcryptjs'

class Crypt {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  private static async unhashPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await this.unhashPassword(password, hashedPassword)
  }
}

export default Crypt
