# this code generate the tree structure of the directory.
import os

def tree(dir_path, prefix="", output_lines=[]):
    entries = sorted(os.listdir(dir_path))
    entries = [e for e in entries if e not in ('__pycache__', 'migrations', '.git', 'env', 'node_modules')]
    
    for i, entry in enumerate(entries):
        path = os.path.join(dir_path, entry)
        connector = "└── " if i == len(entries) - 1 else "├── "
        output_lines.append(prefix + connector + entry)
        
        if os.path.isdir(path):
            extension = "    " if i == len(entries) - 1 else "│   "
            tree(path, prefix + extension, output_lines)

    return output_lines

if __name__ == "__main__":
    root_dir = "."  # current directory
    output_file = "project_structure.txt"
    
    lines = tree(root_dir)
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✅ Project structure saved to: {output_file}")
