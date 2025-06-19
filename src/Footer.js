import './App.css';

import GithubLinkBox from './GithubLinkBox';

export default function Footer() {

  return (
    <div class="w-full relative">
      <div class="absolute right-0 bottom-0 text-left p-8">
        <p class="max-w-sm text-sm">
          Este projeto foi desenvolvido durante a matéria MC750 da UNICAMP (Interface Humano-Computador) por:
        </p>
        <GithubLinkBox href="https://github.com/">Adriano Ribeiro Franulovic Campos</GithubLinkBox>
        <GithubLinkBox href="https://github.com/">Giovani Mambrim Leme</GithubLinkBox>
        <GithubLinkBox href="https://github.com/">Matheus Ferraciú Scatolin</GithubLinkBox>
        <GithubLinkBox href="https://github.com/">Pietro Fernandes Magaldi</GithubLinkBox>
        <GithubLinkBox href="https://github.com/RafaelSetton">Rafael Setton Alencar de Carvalho</GithubLinkBox>
      </div>
    </div>
  );

}


