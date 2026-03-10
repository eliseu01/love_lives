# Instruções para Claude Code — Estilo Carta Manuscrita

## Objetivo
Transformar a carta expandida (Tela 2.4) do estilo "card limpo" para o estilo "carta manuscrita em papel envelhecido", como na imagem de referência.

---

## 1. Adicionar fonte manuscrita no HTML (ou index.html / _document)

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 2. CSS da Carta (substituir estilos atuais da `.carta-expandida` ou equivalente)

```css
/* Carta estilo manuscrito */
.carta-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  background: #FFF8F5;
}

.carta-papel {
  width: 88%;
  max-width: 360px;
  background: #F5EDCC; /* papel amarelado */
  border-radius: 4px;
  padding: 32px 28px 40px 28px;
  transform: rotate(-1.5deg);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    inset 0 0 60px rgba(180,140,60,0.06);
  position: relative;
  font-family: 'Caveat', cursive;
  color: #2C1A0E;
  line-height: 1.75;

  /* Textura sutil de papel */
  background-image:
    repeating-linear-gradient(
      transparent,
      transparent 27px,
      rgba(180,140,60,0.08) 27px,
      rgba(180,140,60,0.08) 28px
    );
}

/* Dobra no canto superior direito */
.carta-papel::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 24px 24px 0;
  border-color: transparent #e8d8a0 transparent transparent;
  filter: drop-shadow(-2px 2px 2px rgba(0,0,0,0.1));
}

.carta-de-para {
  font-size: 14px;
  font-family: 'Caveat', cursive;
  color: rgba(44, 26, 14, 0.55);
  margin-bottom: 22px;
  line-height: 1.6;
  border-bottom: 1px dashed rgba(44, 26, 14, 0.15);
  padding-bottom: 14px;
}

.carta-de-para span {
  display: block;
}

.carta-saudacao {
  font-size: 22px;
  font-weight: 700;
  color: #1a0e06;
  margin-bottom: 18px;
  display: block;
}

.carta-corpo {
  font-size: 19px;
  font-weight: 400;
  color: #2C1A0E;
  white-space: pre-wrap;
}

.carta-corpo p {
  margin-bottom: 16px;
}

.carta-assinatura {
  margin-top: 24px;
  font-size: 21px;
  font-weight: 700;
  color: #1a0e06;
  text-align: right;
}

.carta-data {
  font-size: 14px;
  color: rgba(44, 26, 14, 0.5);
  text-align: center;
  margin-top: 20px;
  font-family: 'Caveat', cursive;
  font-style: italic;
}
```

---

## 3. JSX / HTML da Carta (estrutura)

```jsx
<div className="carta-container">
  <div className="carta-papel">
  <div className="carta-de-para">
      <span>De: Luciano</span>
      <span>Para: Karlla</span>
    </div>

    <span className="carta-saudacao">Para Karlla,</span>

    <div className="carta-corpo">
      <p>Desde o primeiro dia, soube que você era especial.</p>
      <p>Cada momento ao seu lado é uma lembrança que guardo com carinho.</p>
      <p>Obrigado por cada sorriso, cada abraço, cada aventura.</p>
      <p>Te amo hoje e sempre.</p>
    </div>

    <div className="carta-assinatura">Luciano ♡</div>
    <div className="carta-data">27.06.16</div>
  </div>
</div>
```

---

## 4. Remover da carta atual
- ❌ Título `"Nossa História"` (Playfair Display centrado)
- ❌ Ícone/ornamento floral do topo
- ❌ `border: 1px solid #F0D9C8`
- ❌ Fundo branco `#FFFDF9`
- ❌ Fonte `Lato` no corpo

## 5. Resumo visual das mudanças

| Antes | Depois |
|---|---|
| Fundo branco | Papel amarelado `#F5EDCC` |
| Título "Nossa História" | Saudação "Para Karlla," manuscrita |
| Font: Lato (sans-serif) | Font: Caveat (cursiva manuscrita) |
| Sem rotação | Leve rotação `-1.5deg` |
| Borda fina colorida | Sombra + textura de linhas de papel |
| Ornamento SVG | Dobra de canto (CSS) |
