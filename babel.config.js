module.exports = {
    presets: [
        ['@babel/preset-env',{
            modules:false,
            useBuiltIns:'usage',
            corejs: '3.21',
            targets:{
                chrome: 89
            }
        }]
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-class-properties',
        [
            '@babel/plugin-syntax-import-attributes',
            {
                "deprecatedAssertSyntax": true
            }
        ]
    ]
}
