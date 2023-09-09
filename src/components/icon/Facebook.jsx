
const Facebook = ({shareSns, url}) => {
  return (
    <img onClick={() => shareSns('F', null, null, null, null, url)} style={{width: '40px', height: '40px'}} src='/images/svg/facebook.svg'/>
  )
}

export default Facebook