const cds = require('@sap/cds');
const { SELECT ,INSERT} = cds.ql;
const { Reviews } = cds.entities('com.sap.bookshop');

module.exports = function () {

    this.after("READ", "Books", (req) => {
        req.forEach((book) => {
            if (book.stock > 20) {
                book.discount = 10;
            }
        });
    });

    this.on("rateBook", async (req) => {
        try {
            const insertedReview = await INSERT.into(Reviews).columns('R_ID','book_B_ID','rating')
            .values(R4, req.data.book_B_ID, req.data.rating);
            return req.data;
        }
        catch (error) {
            req.error({ status: 404, message: error });
        }
    });

    this.on("getPopularBook", async (req) => {
        const highestRatedBook = await SELECT.from(Reviews).columns`{ MAX(rating) as rating}`;
        return highestRatedBook;
    });
}