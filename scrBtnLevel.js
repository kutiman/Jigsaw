#pragma strict

public var level : int = 0;

function Start () {

}

function Update () {

}

function OnMouseUp () {
	scrGame.OpenLevel(level);
	Destroy(gameObject);
}