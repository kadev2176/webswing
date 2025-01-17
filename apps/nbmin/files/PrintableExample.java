package org.webswing.demo.printing;

/*
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Window;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;

import javax.swing.SwingUtilities;

public class PrintableExample implements Printable, ActionListener {

	private PrintingDemo frameToPrint;
	
	public PrintableExample(PrintingDemo f) {
		frameToPrint = f;
	}

	public int print(Graphics g, PageFormat pf, int page) throws PrinterException {
		if (page > 0) { /* We have only one page, and 'page' is zero-based */
			return NO_SUCH_PAGE;
		}
		
		if (!(g instanceof Graphics2D)) {
			return PAGE_EXISTS;
		}

		Window windowToPrint = SwingUtilities.getWindowAncestor(frameToPrint);
		
		double scale = 1.0;
		double sx = pf.getImageableWidth() / windowToPrint.getWidth();
		double sy = pf.getImageableHeight() / windowToPrint.getHeight();
		
		scale = Math.min(Math.min(sx, sy), scale);
		
		/* User (0,0) is typically outside the imageable area, so we must
		 * translate by the X and Y values in the PageFormat to avoid clipping
		 */
		Graphics2D g2d = (Graphics2D) g;
		g2d.translate(pf.getImageableX(), pf.getImageableY());
		g2d.scale(scale, scale);

		// TODO scale properly
		
		/* Now print the window and its visible contents */
		windowToPrint.printAll(g);

		/* tell the caller that this page is part of the printed document */
		return PAGE_EXISTS;
	}

	public void actionPerformed(ActionEvent e) {
		boolean portrait = "Portrait".equals(frameToPrint.orientation.getSelectedItem());
		PrinterJob job = PrinterJob.getPrinterJob();
		job.setPrintable(this);

		boolean ok = job.printDialog(PrintingDemo.getDefaultPrintAttributes(portrait, job));
		if (ok) {
			try {
				job.print();
			} catch (PrinterException ex) {
				/* The job did not successfully complete */
			}
		}
	}

}