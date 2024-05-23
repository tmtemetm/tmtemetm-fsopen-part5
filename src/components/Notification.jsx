import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const style = notification.isError ? {
    backgroundColor: '#e3d3d3',
    color: 'darkred',
    borderColor: 'darkred'
  } : {
    backgroundColor: '#c0ffc0',
    color: 'darkgreen',
    borderColor: 'darkgreen'
  }

  return (
    <div
      className='notification'
      style={style}
    >
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification
