import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'smart-alpha-jobs',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'ap-northeast-1',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    hello: {
      handler: 'src/functions/hello/handler.main'
    },
    hello2: {
      handler: 'src/functions/hello2/handler.main'
    },
  },
  package: { 
    individually: true,
    patterns: [
      '!node_modules/.prisma/client/libquery_engine-*',
      'node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node',
      '!node_modules/prisma/libquery_engine-*',
      '!node_modules/@prisma/engines/**',
      '!node_modules/.cache/prisma/**'  // only required for Windows
    ]
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
