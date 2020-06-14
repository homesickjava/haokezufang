

export default {

  'GET /ocr/freshTKList': (req, res) => {

    console.log("mockrequest ", req);
    console.log("mockresponse ", res);

    const result = {
        list: [{'':''}],
        pagination: {"total":46,"pageSize":10,"current":1},
    }

    res.status(200).send({
      req: req,
      res: res,
    });
    return res.json(result);

  },

};
