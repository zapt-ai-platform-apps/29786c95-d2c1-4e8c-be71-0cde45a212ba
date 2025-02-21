function Home() {
  console.log('Navigated to Home screen');
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Estudo Cebraspe</h1>
      <p className="text-lg">Prepare-se para os concursos com questões reais e simulados personalizados.</p>
    </div>
  );
}

export default Home;