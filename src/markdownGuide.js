const markdownGuide = `# Guide Markdown

> Ce guide couvre les éléments supportés dans cet éditeur.

---

## Titres

\`\`\`
# Titre 1
## Titre 2
### Titre 3
#### Titre 4
\`\`\`

---

## Styles de texte

\`\`\`
**gras**
*italique*
~~barré~~
**_gras et italique_**
\`\`\`

**gras** — *italique* — ~~barré~~ — **_gras et italique_**

---

## Citations

\`\`\`
> Citation simple
>
> Citation sur plusieurs lignes
>
> > Citation imbriquée
\`\`\`

> Citation simple
>
> Citation sur plusieurs lignes
>
> > Citation imbriquée

---

## Listes

\`\`\`
- élément
- élément
  - sous-élément
    - sous-sous-élément

1. premier
2. deuxième
3. troisième
\`\`\`

- élément
- élément
  - sous-élément

1. premier
2. deuxième
3. troisième

---

## Cases à cocher

\`\`\`
- [x] Tâche complète
- [ ] Tâche à faire
\`\`\`

- [x] Tâche complète
- [ ] Tâche à faire

---

## Code

\`\`\`
\\\`code inline\\\`
\`\`\`

\\\`\\\`\\\`javascript
const message = "Hello World"
console.log(message)
\\\`\\\`\\\`

\`code inline\`

\`\`\`javascript
const message = "Hello World"
console.log(message)
\`\`\`

---

## Tableaux

\`\`\`
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|:---------:|----------:|
| gauche    | centre    | droite    |
| 1         | 2         | 3         |
\`\`\`

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|:---------:|----------:|
| gauche    | centre    | droite    |
| 1         | 2         | 3         |

---

## Liens et images

\`\`\`
[texte du lien](https://github.com)
![description](https://url-image.com/img.png)
\`\`\`

[texte du lien](https://github.com)

---

## Séparateur

\`\`\`
---
\`\`\`

---

## Échapper des caractères

Ajoute un \\ devant pour échapper :

\`\`\`
\\*pas italique\\*
\\# pas un titre
\`\`\`

\\*pas italique\\* — \\# pas un titre
`

export default markdownGuide