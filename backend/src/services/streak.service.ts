import User from "../models/user.model";

export const updateStreak = async (userId: string) => {
    const user = await User.findById(userId);

    if(!user) return;

    const today = new Date();
    const last = user.lastActivityDate ? new Date(user.lastActivityDate): null;

    const isSameDay = last && today.toDateString() === last.toDateString();
    const isYesterday = last && new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString() === last.toDateString();

    if(isSameDay)  return;
    
    if(isYesterday){
        user.currentStreak += 1;
    } else{
        user.currentStreak = 1;
    }

    if (user.currentStreak > user.longestStreak) {
        user.longestStreak = user.currentStreak;
      }
    
    user.lastActivityDate = today;
    
    await user.save();
}