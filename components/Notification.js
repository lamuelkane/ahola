import { store } from "react-notifications-component";


const Notification = (props) => {
    store.addNotification({
      title:props.title,
      message:props.message,
      type: props.type,
      container: props.container, 
      insert:props.insert,
      animationIn: ["animated", props.animationIn],
      animationOut: ["animated", props.animationOut],
      dismiss:{
        duration:props.duration,
        showIcon: true
      }
    })
}

export default Notification