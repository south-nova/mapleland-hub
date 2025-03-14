import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  prettierConfig,
  {
    files: ['renderer/**/*.ts', 'renderer/**/*.tsx'],
    plugins: {
      prettier,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // var 키워드 사용 금지
      'no-var': 'error',
      // 가능한 모든 경우에 const 사용
      'prefer-const': 'error',
      // 정의되기 전에 변수 사용 금지
      'no-use-before-define': 'error',
      // 사용하지 않는 변수 경고 비활성화
      'no-unused-vars': 'off',
      // Prettier 포매팅 규칙 적용 (줄 끝 문자 자동 처리)
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // React import 구문 생략 허용
      'react/react-in-jsx-scope': 'off',
      // React Hooks 규칙 강제
      'react-hooks/rules-of-hooks': 'error',
      // 의존성 배열 검사
      'react-hooks/exhaustive-deps': 'warn',
      // 컴포넌트만 내보내기 검사 (상수 내보내기 허용)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // 사용하지 않는 변수 경고
      '@typescript-eslint/no-unused-vars': 'warn',
      // 카멜케이스 네이밍 규칙 (속성 이름 제외)
      camelcase: ['error', { properties: 'never' }],
    },
  },
];

export default eslintConfig;
