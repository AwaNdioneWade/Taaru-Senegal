import React, { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail('')
    }, 1500)
  }

  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
            Rejoignez notre communauté
          </h2>
          <div className="w-24 h-1 bg-[#00853F] mx-auto mb-6"></div>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Soyez les premiers informés de nos nouvelles collections, événements exclusifs et offres spéciales.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-5 h-5 mr-2 text-[#00853F]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#666666]">Offres exclusives</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-5 h-5 mr-2 text-[#00853F]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#666666]">Événements VIP</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="w-full px-6 py-4 rounded-xl border-2 border-[#00853F]/10 focus:border-[#00853F] focus:outline-none transition-colors duration-300 bg-[#F4F4F4]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-2 top-2 bg-[#00853F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#006B32] transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi...
                        </span>
                      ) : isSuccess ? (
                        <span className="flex items-center justify-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Envoyé
                        </span>
                      ) : (
                        "S'inscrire"
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[#666666] text-center md:text-left">
                    En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous désinscrire à tout moment.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
