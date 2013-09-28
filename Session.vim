let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Projects/express-tddprimer
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +24 tests/users.js
badd +1 test/test.js
badd +1 lib/users.js
badd +13 test/users.js
badd +4 .editorconfig
badd +21 .jshintrc
silent! argdel *
edit lib/users.js
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 135) / 270)
exe 'vert 2resize ' . ((&columns * 104 + 135) / 270)
exe 'vert 3resize ' . ((&columns * 134 + 135) / 270)
argglobal
enew
file NERD_tree_1
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=2
setlocal nofen
wincmd w
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=2
setlocal fen
9
normal zo
21
normal zo
9
normal zo
let s:l = 90 - ((53 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
90
normal! 029l
wincmd w
argglobal
edit test/users.js
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=2
setlocal fen
9
normal zo
12
normal zo
9
normal zo
let s:l = 28 - ((27 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
28
normal! 06l
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 135) / 270)
exe 'vert 2resize ' . ((&columns * 104 + 135) / 270)
exe 'vert 3resize ' . ((&columns * 134 + 135) / 270)
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
let g:this_obsession = v:this_session
unlet SessionLoad
" vim: set ft=vim :
