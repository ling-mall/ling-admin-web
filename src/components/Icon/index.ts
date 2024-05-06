export const getIconNameList = () => {
  const module = import.meta.glob('./data/*.ts', { eager: true }) as Recordable<Recordable>
  Object.keys(module).forEach((key) => {
    const langFileModule = module[key].default
    console.log(langFileModule)
  })
  return module
}
