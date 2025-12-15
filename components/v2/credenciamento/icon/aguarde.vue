<template>
    <div>
     <svg width="400" height="260" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- fundo -->
  <rect x="40" y="30" width="320" height="200" rx="24" fill="var(--primaryop)"/>

  <!-- navegador único central -->
  <rect x="85" y="55" width="230" height="160" rx="16" fill="white" stroke="#E1D5FF" stroke-width="2"/>
  <rect x="85" y="55" width="230" height="20" rx="16" fill="#F5F3FF"/>
  <circle cx="101" cy="65" r="3.5" fill="#F3A66D"/>
  <circle cx="113" cy="65" r="3.5" fill="#FFD9A8"/>
  <circle cx="125" cy="65" r="3.5" fill="#D5C7FF"/>

  <!-- linhas de texto -->
  <rect x="105" y="88" width="150" height="8" rx="4" fill="#F2F2FA"/>
  <rect x="105" y="102" width="130" height="8" rx="4" fill="#F4F4FB"/>
  <rect x="105" y="116" width="110" height="8" rx="4" fill="#F4F4FB"/>

  <!-- bloco de análise -->
  <rect x="205" y="110" width="90" height="70" rx="12" fill="var(--primaryop)" stroke="var(--primary)" stroke-width="2"/>

  <!-- documento -->
  <rect x="218" y="120" width="38" height="46" rx="6" fill="white" stroke="var(--primaryop)" stroke-width="1.5"/>
  <rect x="223" y="128" width="28" height="4" rx="2" fill="#F4F4FB"/>
  <rect x="223" y="136" width="24" height="4" rx="2" fill="#F4F4FB"/>
  <rect x="223" y="144" width="20" height="4" rx="2" fill="#F4F4FB"/>

  <!-- check no documento -->
  <path d="M223 153L228 158L236 148" stroke="#65C18C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- relógio (tempo de análise) -->
  <circle cx="262" cy="144" r="16" fill="var(--primaryop)" stroke="var(--primary)" stroke-width="1.5"/>
  <path d="M262 137V144" stroke="var(--primary)" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M262 144L270 148" stroke="var(--primary)" stroke-width="1.6" stroke-linecap="round"/>

  <!-- "loading" -->
  <circle cx="140" cy="172" r="3.5" fill="var(--primaryop)"/>
  <circle cx="152" cy="172" r="3.5" fill="var(--primaryop)"/>
  <circle cx="164" cy="172" r="3.5" fill="var(--primary)"/>
</svg>


    </div>
</template>