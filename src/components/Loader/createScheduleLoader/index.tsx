import { Box } from '@mui/system';
import classes from './createSchedule.module.css'

interface Props {
  loadingText?: string;
}

const CreateScheduleLoader = ({ loadingText }: Props) => {
  return (
    <>
      <div className={classes.loader}>
        <div className={classes.waves}></div>
      </div>
      <div className={classes['loader-text']}>
        <p>{ loadingText }</p>
      </div>
    </>
  )
}

export default CreateScheduleLoader