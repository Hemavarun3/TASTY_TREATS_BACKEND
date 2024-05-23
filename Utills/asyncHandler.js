


const asyncHandler=(fun) => async (req,res,next) => {
    try {
        await fun(req,res,next)
    } catch (error) {
        console.log(`${error.message}`);
    }
}

export default asyncHandler;