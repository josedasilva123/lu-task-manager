API do Lu Task Manager

Fastify (NodeJS) + PostgreSQL

## Instruções

Para subir executar o projeto em desenvolvimento, você deverá configurar as variáveis de ambiente e rodar o seguinte comando.

```bash
npm run dev
```

Caso seja o primeiro clone, você deverá rodar os seguintes comandos

```bash
npm install
```

```bash
npx prisma migrate dev
```

### Deploy

Para subir o projeto, será necessário configurar as variáveis de ambientes na hospedagem e rodar a seguinte sequência de comandos.

```bash
npm install && npm run build && npm run migrate && npm run start
```
