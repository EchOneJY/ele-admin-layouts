export const getUrlParam = name => {
  const urlParams = new URL(window.location.href)
  return urlParams.searchParams.get(name)
}
