import './App.css';

import GithubLinkBox from './GithubLinkBox';

export default function Footer() {

  return (
    <div className="w-full relative">
      <div className="absolute right-0 bottom-0 text-left p-8">
        <p className="max-w-sm text-sm">
          Este projeto foi desenvolvido durante a matéria MC750 da UNICAMP (Interface Humano-Computador) por:
        </p>
        <GithubLinkBox href="https://github.com/AdrianoCampos05">Adriano Ribeiro Franulovic Campos</GithubLinkBox>
        <GithubLinkBox href="https://github.com/Giovanipt2">Giovani Mambrim Leme</GithubLinkBox>
        <GithubLinkBox href="https://github.com/Matheus-F-Scatolin">Matheus Ferraciú Scatolin</GithubLinkBox>
        <GithubLinkBox href="https://github.com/pietromagaldi">Pietro Fernandes Magaldi</GithubLinkBox>
        <GithubLinkBox href="https://github.com/RafaelSetton">Rafael Setton Alencar de Carvalho</GithubLinkBox>
      </div>
    </div>
  );

}


