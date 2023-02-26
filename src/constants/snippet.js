export const snippet = (language) => {


    switch (language) {
        case 'javascript':
            return 'console.log("Hello, World!");';

        case 'c':
            return "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello Judge0!\\n\");\n    return 0;\n}\n"

        case 'cpp':
            return `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}`;


        case 'python':
            return 'print("Hello, World!");'


        case 'java':
            return `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`;


        default:
            return `// Type Your code here`


    }

}