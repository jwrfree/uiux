import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';

export default tseslint.config(
    // Base configuration for TypeScript files
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },

    // Accessibility rules
    {
        plugins: {
            'jsx-a11y': jsxA11y,
        },
        rules: jsxA11y.configs.recommended.rules,
    },

    // Import resolver settings
    {
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
        plugins: {
            'import': pluginImport,
        },
        rules: {
            'import/no-unresolved': 'error',
        }
    },

    // Global ignores
    {
        ignores: ['node_modules/', '.next/', 'eslint.config.mjs'],
    }
);
