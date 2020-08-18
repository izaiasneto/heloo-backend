# heloo-backend

# Como executar esse projeto

- Instale o [Nodejs](https://nodejs.org/en/)
- Instale o [Docker](https://www.docker.com)

# Como instalar o mongoDB

- Baixar a maquina virtual do MongoDB
<pre>docker pull mongo</pre>

- Novo container da instalacao
<pre>docker run --name mongodb -p27017:27017 -d mongo</pre>

- Retornar as imagens que estão rodando
<pre>docker ps</pre>

# Como executar 

- Instale todas as dependências

<pre>npm install</pre>

- Inicie o servidor Web

<pre>npm run dev</pre>



