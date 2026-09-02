import fs from "node:fs";
import path from "node:path";

const ICONS_DIR = path.resolve("src/components/icons");

function extractPath(svg: string): string {
    const match = svg.match(/<path[\s\S]*?\/>/);

    if (!match) {
        throw new Error("No <path /> found in SVG");
    }

    return match[0];
}

export function generateIcon(
    iconName: string,
    JSXContent: string
): void {

    const regexName = /^[A-Z][A-Za-z0-9]*Icon$/;
    if (!regexName.test(iconName)) {
        throw new Error(
            `Invalid icon name: "${iconName}". Example: EyeSlashIcon`
        );
    }

    const iconPath = extractPath(JSXContent);
    if (!iconPath.trim()) {
        throw new Error("SVG content cannot be empty.");
    }

    if (!fs.existsSync(ICONS_DIR)) {
        fs.mkdirSync(ICONS_DIR, { recursive: true });
    }

    const component = `
        import IconBase from "./IconBase";
        import type { IconProps } from "./type";

        const ${iconName} = (props: IconProps) => {
            return (
                <IconBase {...props}>
                    ${iconPath.trim()}
                </IconBase>
            );
        };

        export default ${iconName};
    
    `;

    const filePath = path.join(
        ICONS_DIR,
        `${iconName}.tsx`
    );

    if (fs.existsSync(filePath)) {
        throw new Error(
            `Icon "${iconName}" already exists.`
        );
    }

    fs.writeFileSync(
        filePath,
        component,
        "utf8"
    );

    console.log(`✓ ${iconName}.tsx created successfully.`);
}
