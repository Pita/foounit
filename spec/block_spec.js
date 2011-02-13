if (typeof global !== 'undefined'){
  var foounit = require('../dist/foo-unit-node');
}
var footest = foounit.require(':src/foo-unit');

foounit.add(function (kw){ with(kw){
  describe('.run', function (){
    describe('when there is an error in the block', function (){
      var block;

      before(function (){
        block = new footest.Block(function (){
          throw new Error('errraaaaaaaaaaar!');
        });
      });

      it('calls onFailure and it has an exception', function (){
        var actual;
        block.onFailure = function (block){ actual = block; }
        block.run();

        expect(actual).to(be, block);
        expect(block.getException().message).to(equal, 'errraaaaaaaaaaar!');
      });
    });

    describe('when there are no errors in the block', function (){
      var block;

      before(function (){
        block = new footest.Block(function (){ });
      });

      it('calls onComplete and it does NOT have an exception', function (){
        var actual;

        block.onComplete = function (){
          actual = block;
        };
        block.run();

        expect(actual).to(be, block);
        expect(block.getException()).to(beUndefined);
      });
    });
  });
}});
