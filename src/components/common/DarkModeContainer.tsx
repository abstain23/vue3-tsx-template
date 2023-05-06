import {  type FunctionalComponent } from "vue"

type Props = {
  inverted?: boolean
}

const DarkModeContainer:FunctionalComponent<Props> = (props, {slots}) => {
  const baseClass = 'dark:bg-dark dark:text-white dark:text-opacity-82 transition-all'
 
  return (
    <div class={`${baseClass} ${props.dadas}`}></div>
  )
}

export default DarkModeContainer