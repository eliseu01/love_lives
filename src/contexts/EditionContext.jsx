import { createContext, useContext } from 'react'
import editionConfig from '../editions'

const EditionContext = createContext(editionConfig)

export function EditionProvider({ children }) {
  return (
    <EditionContext.Provider value={editionConfig}>
      {children}
    </EditionContext.Provider>
  )
}

// Hook que qualquer componente usa para ler a config da edição ativa
// Ex: const { copy, assets, Decoration } = useEdition();
export function useEdition() {
  return useContext(EditionContext)
}
