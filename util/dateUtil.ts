import dayjs from "dayjs";

const transform = (date: Date) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export default {
    transform
}