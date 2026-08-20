export type ApplicationPayload = { firstName: string; lastName: string; email: string; phone: string; message: string }

export async function submitApplication(_payload: ApplicationPayload): Promise<void> {
  // TODO: replace with the real application endpoint when it is available.
  throw new Error('Форма ще не підключена до сервера. Будь ласка, напишіть нам на info@unimind.education.')
}
