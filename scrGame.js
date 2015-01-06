#pragma strict

function Start () {
	CreatePieces();
}

function Update () {

}

function CreatePieces () {
	for (var i = 0; i < 6; i++) {
		for (var n = 0; n < 4; n++) {
			var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/objPiece"));
			obj.GetComponent(scrPiece).gridPos = Vector2(i,n);
			obj.GetComponent(scrPiece).correctPos = Vector2(-4.0 + i * 1.6, 2.4 - n * 1.6);
		}
	}
}

function GetGridPositions () {
	var posArr : Vector2;
}

