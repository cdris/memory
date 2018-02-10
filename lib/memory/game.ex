defmodule Memory.Game do

  @letters = ["A", "A", "B", "B", "C", "C", "D", "D",
              "E", "E", "F", "F", "G", "G", "H", "H"]
  @matched = 0
  @unmatched = 1
  @selected = 2

  def new do
    %{
      tiles: Enum.map Enum.shuffle(@letters), fn(l) ->
        {letter: l, state: @unmatched}
      end,
      score: 0
    }
  end

  def guess(game, l_idx) do
    if l_idx >= length(@letters) do
      raise "Invalid guess"
    end

    tile = game.tiles[l_idx]

    if tile.state == @unmatched do
      match = Enum.find(game.tiles, nil, fn(x) -> x.state == @selected)
      cond do
        match != nil and match.letter == tile.letter ->
          %{
            tiles: Enum.map game.tiles, fn(t) ->
              {
                letter: t.letter,
                state: if t.letter == tile.letter, do: @matched, else: t.state
              }
            end,
            score: game.score + 1
          }
        match != nil ->
          %{
            tiles: Enum.map game.tiles, fn(t) ->
              {
                letter: t.letter,
                state: if t.state == @seleted or t.letter == tile.letter do
                  @unmatched
                else
                  t.state
                end
              }
            end,
            score: game.score + 1
          }
        true ->
          %{
            tiles: List.replace_at(game.tiles, l_idx,
                                   {letter: tile.letter, state: @selected}),
            score: game.score + 1
          }
      end
    else
      game
    end
  end
