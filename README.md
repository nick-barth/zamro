This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

```
  yarn start
```

## README
This is one of the rare coding problems I have had trouble with and I'm not totally happy with my solution. It only contains two components, which is dissapointing, even though it barely cracks 100LOC I felt as though the table could've been re-usable.  I did not want to split the table and the header up, as it would require me to use some magic css numbers to keep them aligned.  In addition, I would have to prop drill both of them, which isn't the look I'm going for.  I put no consideration into comparing more than 4.  I wrote my own table with css, I think though, depending on the context, that in production I would've used [react-table](https://react-table.js.org/#/story/readme).

Webpack came with create-react-app, and I also did not see a particular need to use less/sass, because this was easy enough to achieve with vanilla css.  

Total time spent was ~6 hours, however, I was distracted during most of them, so realistically I think it would've been 4 hours of straight work.
