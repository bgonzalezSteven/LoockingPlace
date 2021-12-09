const Mail = use('Mail')
class Email {
  static async sendCredentials ({to, subject, content,from, cc, pages, attachments, event}) {
    await Mail.send(pages, content, (message) => {
        message
          .to(to)
          .from(from, subject)
          .subject(cc)
      })
  }
}
module.exports = Email