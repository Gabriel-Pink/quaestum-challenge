export function EmailVerification() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Verifique seu e-mail
          </h1>
          <p className="text-gray-600">
            Enviamos um link para redefinir a senha de acesso. Por favor, verifique sua caixa de entrada (e também a pasta de spam) e clique no link para concluir o cadastro.
          </p>
          <p className="text-gray-600 text-center mt-4">Voltar para <a href="/signin" className="text-blue-600">Login</a></p>
        </div>
      </div>
    );
}