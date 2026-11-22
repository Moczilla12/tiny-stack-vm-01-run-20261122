import{readFileSync as R,readdirSync as d,mkdirSync as m,writeFileSync as w}from"node:fs"
let T=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`,I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",B=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a/b,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0]
for(let f of d(I)){
let A=I+"/"+f,Y=O+"/"+f,P=R(A+"/program.bin"),N=R(A+"/input.bin"),n=P.length,D=new Int32Array(256),s=0,C=[],c=0,M=[],U=Buffer.alloc(65536),l=0,q=0,p=0,t=0,e=0
for(;;){
let o=P[p],v=o>83?-1:T.charCodeAt(o)-33,i=v>>4,u=(v>>2)&3,g=v&3
if(e=t==1e6?10:p<0||p>=n?9:v<0||v>65?5:p+i>=n?9:s<u?2:s-u+g>256?3:0)break
t++;let x=p+=1+i
if(o<8){if(!o)break;if(o<3)D[s++]=o==1?P.readInt8(x-1):P.readInt32LE(x-4);else if(o==3)s--;else if(o==4||o==6){D[s]=D[s-1-(o==6)];s++}else if(o==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];else[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]]}
else if(o<35){if(o==23)D[s-1]=-D[s-1];else if(o==27)D[s-1]=~D[s-1];else{if(o>18&&o<23&&!D[s-1]){e=4;break}let r=B[o-16](D[s-2],D[s-1]);s-=2;D[s++]=r}}
else if(o<53){if(o<51){let r=P.readInt16LE(x-2);if(o==48||(o==49)==!D[--s])p=x+r}else if(o==51){if(c==64){e=7;break}C[c++]=x;p=P.readUInt16LE(x-2)}else{if(!c){e=8;break}p=C[--c]}}
else if(o<66){let a=D[s-1];if(a<0||a>255){e=6;break}if(o==64)D[s-1]=M[a];else{s-=2;M[a]=D[s]}}
else{if(o==80){let g=D[s-1]+"";if(l+g.length>65536){e=11;break}s--;U.set(Buffer.from(g),l);l+=g.length}else if(o==81){if(l>65535){e=11;break}U[l++]=D[--s]&255}else if(o==82)D[s++]=q<N.length?N[q++]:-1;else{e=D[--s]&255;break}}
}
m(Y,{recursive:!0});w(Y+"/stdout.bin",U.subarray(0,l));w(Y+"/exit.txt",e+"\n")
}
